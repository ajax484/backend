import axios from "axios";
import { default as dotenv } from "dotenv";
import supabase from "../../config/supabase.config.js";
dotenv.config();

const verifyDeposit = async (request, response) => {
  try {
    console.log("veify");
    const secretHash = process.env.FLW_SECRET_HASH;
    const signature = request.headers["verif-hash"];

    // check secret hash
    if (!signature || signature !== secretHash)
      throw new Error("request not from flutterwave");

    console.log(request.body);

    //send back response
    response.status(200).end();

    const { data: payload } = request.body;

    // extract id from transaction
    const trx_id = payload.tx_ref;
    console.log(payload.status);

    const { data: insertIntoDB, error } = await supabase
      .from("deposits")
      .update({
        status: payload.status === "successful" ? 1 : -1,
      })
      .eq("id", trx_id);

    if (error) throw new Error(error.message);
  } catch (error) {
    console.log(error);
  }
};

export { verifyDeposit };
