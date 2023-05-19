import { fetchSingleCharacter } from "../../lib/rickmort";

const getRickCharacter = async (req, res) => {
  try {
    // https://rickandmortyapi.com/api/character/?name=rick&status=alive
    const { name } = req.query;
    let reqUrl = `https://rickandmortyapi.com/api/character/?name=${name}&status=alive`;
    console.log(reqUrl);
    const response = await fetch(reqUrl, {
      headers: {
        Authorization: process.env.API_KEY,
      },
    });
    const data = await response.json()

    // console.log({ response }, "Api");
    // console.log({req})
    res.status(200);
    // res.json(response);
    // console.log(data)
    res.json(data)
  } catch (err) {
    console.error("There is an error", err);
    res.status(500);
    res.json({ message: "Oh no! Something went wrong", err });
  }

  //return
};

export default getRickCharacter;
