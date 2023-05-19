const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffee store");
console.log({ table });

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

          const records = findCoffeeStoreRecords.map((record) => {
            return {
              ...record.fields,
            };
          });
          res.json(records);
        } else {
          //create a record
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
            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });

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
