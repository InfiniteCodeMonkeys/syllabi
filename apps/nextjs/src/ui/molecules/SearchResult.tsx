import { Badge } from "@/components/ui/badge";
import React from "react";
import useStore, { RootState } from "store";
import { trpc } from "utils/trpc";

interface BillFromGetBills {
  congress: number;
  latestAction: {
    actionDate: string;
    text: string;
  };
  number: string;
  title: string;
  type: string;
  url: string;
  originChamber: string;
  originChamberCode: string;
  updateDate: string;
  updateDateIncludingText: string;
}

const SearchResult = ({ bill }: { bill: BillFromGetBills }) => {
  const { mutate } = trpc.openai.upload.useMutation();
  const setNamespace = useStore((state: RootState) => state.setNamespace);
  const { data } = trpc.congress.getBillTextURL.useQuery({
    congress: bill.congress,
    billType: bill.type,
    billNumber: bill.number,
  });

  const handleChatClick = ({
    congress,
    billType,
    billNumber,
  }: {
    congress: number;
    billType: string;
    billNumber: string;
  }) => {
    mutate({
      congress,
      billType,
      billNumber,
    });
    setNamespace(`${congress}-${billType}-${billNumber}`);
  };
  return (
    <li key={bill.url}>
      <div className="flex min-h-[180px] w-full justify-between border-b-2 pb-2 pt-1">
        <div>
          <Badge className="ml-1 mt-2 bg-gray-700">Bill</Badge>
          <button className="w-full p-2 text-left hover:bg-gray-100">
            <span className="mr-0 underline">
              {bill.type}.{bill.number}
            </span>
          </button>
          <div className="max-w-[90%]">
            <span className="mt-1 line-clamp-2 pl-2">{bill.title}</span>
            <span className="mt-2 line-clamp-1 pl-2 text-sm text-gray-600">
              Latest Action: {bill.latestAction.text}
            </span>
          </div>
        </div>
        <div className="flex w-[300px] flex-col items-end justify-between text-right">
          <span className="block text-xs">{bill.congress}th Congress</span>
          <div className="flex flex-col">
            <button
              className="my-1 rounded bg-sky-700 px-6 py-2 font-semibold text-white hover:bg-sky-900"
              onClick={() =>
                handleChatClick({
                  congress: bill.congress,
                  billType: bill.type,
                  billNumber: bill.number,
                })
              }
            >
              Chat
            </button>
            <button
              className="my-1 rounded border-2 border-gray-500 px-6 py-2 font-semibold hover:bg-gray-200"
              onClick={() => console.log("compare")}
            >
              Compare
            </button>
            {data ? (
              <a
                className="text-center underline"
                href={data as string}
                target="_blank"
                rel="noreferrer"
              >
                View PDF
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchResult;
