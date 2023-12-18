

export const getNFTs = async () => {
    try {
      const response = await fetch(`https://blockhosts.deals/api/1.1/obj/nft`)
      const jsonResponse = await response.json();
      return jsonResponse.response.results
    } catch (e) {
    //   handleAPICatch('getNFTs', JSON.stringify(e))
      return null
    }
  }

  export const getSearch = async (url) => {
    try {
      const response = await fetch(url)
      const jsonResponse = await response.json();
      return jsonResponse.response.results
    } catch (e) {
    //   handleAPICatch('getNFTs', JSON.stringify(e))
      return null
    }
  }