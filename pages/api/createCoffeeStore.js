import { getMinifiedRecords, table } from "@/lib/airtable";


// This fixes resolver is not a function
const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    //find a record, running post from postman

    const { id, name, neighborhood, address, imgUrl, voting } = req.body;
    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        console.log({ findCoffeeStoreRecords });

        if (findCoffeeStoreRecords.length !== 0) {
          // returns an array, hence run a check against the length

          const records = getMinifiedRecords(findCoffeeStoreRecords)
          res.json(records);
        } else {
          //create a record if id requested is not available
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  voting,
                  imgUrl,
                  neighborhood,
                },
              },
            ]);

            //created record can be returned and used
          const records = getMinifiedRecords(createRecords)

            res.json({ message: "create a record", records });
          } else {
            // return bad syntax error code
            res.status(400);

            res.json({ message: "Id or name is missing" });
          }
        }
      }
    } catch (error) {
      console.error("Error finding or Creating store", err);
      res.status(500);
      res.json({ message: "Error finding or creating store", err });
    }
  }
};

export default createCoffeeStore;
