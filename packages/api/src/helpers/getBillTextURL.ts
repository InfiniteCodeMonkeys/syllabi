const getBillTextURL = async (
  congress: number,
  billType: string,
  billNumber: string,
) => {
  try {
    const response = await fetch(
      `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}/text?format=json&api_key=${process.env.CONGRESS_API_KEY}`,
      { method: "GET" },
    );

    const data = await response.json();

    const { formats } = data.textVersions[0];

    if (formats.length === 0) return null;

    const pdfUrl: string = formats.find(
      (format: any) => format.type === "PDF",
    ).url;

    return pdfUrl;
  } catch (error: any) {
    console.error(error);
    return { message: error.message };
  }
};

export default getBillTextURL;
