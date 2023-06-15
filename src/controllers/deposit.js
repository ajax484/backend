import axios from "axios";
import { generateNonce } from "../helpers/index.js";
import { default as dotenv } from "dotenv";
import supabase from "../../config/supabase.config.js";
dotenv.config();

const makeDeposit = async (request, response) => {
  try {
    const { user_id, firstName, lastName, email, amount } = request.body;
    const trx_id = generateNonce();
    console.log({ user_id, firstName, lastName, email, amount });
    const flwResponse = await axios({
      method: "post",
      url: `${process.env.FLW_URL}/payments`,
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      },
      data: {
        tx_ref: trx_id,
        amount: amount,
        currency: "NGN",
        redirect_url: `${process.env.CLIENT_URL}/responses/flw`,
        customer: {
          email,
          firstName,
          lastName,
          user_id,
        },
        customizations: {
          title: "Gobuy",
          logo: "https://i.ibb.co/0n4BGdM/Sec-Logo-Blue-on-White-Hor.png",
          description: `deposit ${amount} in gobuy account`,
        },
      },
    });

    const { status, data } = flwResponse.data;

    if (status !== "success") {
      throw new Error("something is wrong");
    }

    const { data: insertIntoDB, error } = await supabase
      .from("deposits")
      .insert({
        id: trx_id,
        uid: user_id,
        amount,
      });

    if (error) {
      throw new Error("something is wrong");
    }

    console.log(data, insertIntoDB, error);

    response.status(200).send(data);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export { makeDeposit };
