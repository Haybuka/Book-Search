export const fetchRickMort = async () => {
    const request = await fetch("https://rickandmortyapi.com/api/character",{
        headers : {
            Authorization : process.env.API_KEY
        }

    });
    const data = await request.json();
    return data
}

export const fetchSingleCharacter = async (name) => {
    
    const request = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`,{
        headers : {
            Authorization : process.env.API_KEY
        }

    });
    const data = await request.json();
    console.log({request})
    return data
}