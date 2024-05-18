import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/exchange_token', async (req, res) => {
  const { publicToken } = req.body;

  try {
    const response = await axios.post('https://api.teller.io/auth/token', {
      public_token: publicToken
    }, {
      headers: {
        Authorization: `Bearer ${process.env.TELLER_API_KEY}`
      }
    });

    const { access_token } = response.data;

    // Return the access token to the client
    res.status(200).json({ accessToken: access_token });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error exchanging token:', error.message);
      res.status(500).json({ message: 'Error exchanging token', error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'Unexpected error' });
    }
  }
});

export { router as tellerRouter };
