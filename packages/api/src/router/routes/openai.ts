import { z } from "zod";
import https from "https";
import fs from "fs";
import path from "path";
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { protectedProcedure, router } from "../../trpc";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import getBillTextURL from "../../helpers/getBillTextURL";
import { PINECONE_INDEX_NAME } from "../../config/pinecone";
import { makeChain } from "../../helpers/makeChain";

export const AIRouter = router({
  prompt: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        namespace: z.string(),
        history: z.array(z.string()).optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const client = new PineconeClient();
        await client.init({
          apiKey: process.env.PINECONE_API_KEY as string,
          environment: process.env.PINECONE_ENVIRONMENT as string,
        });
        const pineconeIndex = client.Index(
          process.env.PINECONE_INDEX as string,
        );

        const vectorStore = await PineconeStore.fromExistingIndex(
          new OpenAIEmbeddings(),
          { pineconeIndex, namespace: input.namespace },
        );

        // OpenAI recommends replacing newlines with spaces for best results
        const sanitizedQuestion = input.question.trim().replaceAll("\n", " ");

        //create chain
        const chain = makeChain(vectorStore);
        //Ask a question using chat history
        const response = await chain.call({
          question: sanitizedQuestion,
          chat_history: input.history || [],
        });
        return { result: response };
      } catch (error: any) {
        console.error(error);
        return { message: error.message };
      }
    }),
  upload: protectedProcedure
    .input(
      z.object({
        congress: z.number(),
        billType: z.string(),
        billNumber: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        console.log("uploading");

        // Check if bill is in database
        const client = new PineconeClient();
        await client.init({
          apiKey: process.env.PINECONE_API_KEY as string,
          environment: process.env.PINECONE_ENVIRONMENT as string,
        });
        const pineconeIndex = client.Index(
          process.env.PINECONE_INDEX as string,
        );

        const billExists = await pineconeIndex.query({
          queryRequest: {
            topK: 1,
            namespace: `${input.congress}-${input.billType}-${input.billNumber}`,
          },
        });

        if (billExists) {
          console.log("Bill already exists in database.");
          return;
        }

        const url = await getBillTextURL(
          input.congress,
          input.billType,
          input.billNumber,
        );
        if (url === null) return "No PDF found";

        https.get(url as string, (res) => {
          // Image will be stored at this path
          const downloadPath = path.resolve(
            `/Users/mike/Desktop/projects/legisGPT/tmp/${input.congress}-${input.billType}-${input.billNumber}.pdf`,
          );

          const filePath = fs.createWriteStream(downloadPath);
          res.pipe(filePath);

          filePath.on("finish", async () => {
            filePath.close();
            console.log("Download Completed");

            const loader = new PDFLoader(downloadPath);

            const docs = await loader.load();

            console.log("docs", docs);

            if (docs.length === 0) {
              console.log("No documents found.");
              return;
            }

            const splitter = new RecursiveCharacterTextSplitter({
              chunkSize: 1000,
              chunkOverlap: 200,
            });

            const splitDocs = await splitter.splitDocuments(docs);

            console.log("splitDocs", splitDocs);

            // Reduce the size of the metadata for each document -- lots of useless pdf information
            const reducedDocs = splitDocs.map((doc) => {
              const reducedMetadata = {
                ...doc.metadata,
              };
              delete reducedMetadata.pdf; // Remove the 'pdf' field
              reducedMetadata.source = `${input.congress}-${input.billType}-${input.billNumber}`;

              return new Document({
                pageContent: doc.pageContent,
                metadata: reducedMetadata,
              });
            });

            console.log(
              `Uploading documents to Pinecone: ${JSON.stringify(
                docs,
                null,
                2,
              )}`,
            );

            /** STEP TWO: UPLOAD TO DATABASE */
            const client = new PineconeClient();

            await client.init({
              apiKey: process.env.PINECONE_API_KEY as string,
              environment: process.env.PINECONE_ENVIRONMENT as string,
            });

            const embeddings = new OpenAIEmbeddings();
            const pineconeIndex = client.Index(PINECONE_INDEX_NAME);

            await PineconeStore.fromDocuments(reducedDocs, embeddings, {
              pineconeIndex,
              namespace: `${input.congress}-${input.billType}-${input.billNumber}`,
              textKey: "text",
            });

            console.log("Successfully uploaded to DB");
            // Modify output as needed
            return {
              result: `Uploaded to Pinecone! Before splitting: ${docs.length}, After splitting: ${splitDocs.length}`,
            };
          });
        });
      } catch (error: any) {
        console.error(error);
        return { message: error.message };
      }
    }),
});
