export default async function handler(req, res) {
    if (req.method === 'GET') {
      const query = req.query.query;
      const endpoint = process.env.USE_PROD_ENDPOINT === "true" ? process.env.PROD_API_ENDPOINT : process.env.LOCAL_API_ENDPOINT;
  
      try {
        const response = await fetch(`${endpoint}/search/cvcrm?query=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: {
            'x-api-key': process.env.CV_API_KEY,
          },
        });
  
        if (response.status !== 200) {
          const errorData = await response.json();
          console.error(`Error in search API: ${errorData}`)
          return res.status(response.status).json({ error: true, ...errorData });
        }
  
        const data = await response.json();
        return res.status(200).json(data);
      } catch (error) {
        console.error(`Error in search API: ${error}`)
        return res.status(500).json({ error: true, message: '/search function error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed for /search`);
    }
  }
  