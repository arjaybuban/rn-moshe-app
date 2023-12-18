Moralis.Cloud.define("loadNFTs", async (request) => {
  const nftArr = request.params.list;
  logger.info("msg C ====>" + JSON.stringify(nftArr));

  let arrayToWrite = [];
  for (let i = 0; i < nftArr.length; i++) {
    nftArr[i] && 
    arrayToWrite.push({
      update: {
        name: nftArr[i].Name,
        address: nftArr[i].Address,
        city: nftArr[i].City,
        zip: nftArr[i]["Zip/Postal Code"],
        country: nftArr[i].Country,
        latitude: nftArr[i].latitude,
        longitude: nftArr[i].longitude,
      },
    });
  }
  await Moralis.bulkWrite(
    'blockhosts',
    arrayToWrite
  );

  return nftArr.length
});
