import { sql } from "../config/db";

export const getTransactionsByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId)
      return res.status(400).json({ message: "User id is required" });

    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at ASC
      `;

    if (transactions.length > 0) {
      return res
        .status(200)
        .json({ message: "Transactions fetched", data: transactions });
    } else {
      return res.status(404).json({
        message: "No transactions found with the user id",
      });
    }
  } catch (error) {
    console.log("error in transaction fetch", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
export const getTransactionsSummaryByuserIdController = async (req, res) => {
  try {
    const { userId } = req.params;

    const balance = await sql`
        SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}
        `;

    const income = await sql`
        SELECT COALESCE(SUM(amount),0) as income FROM transactions
        WHERE user_id = ${userId}
        AND amount > 0
        `;

    const expenses = await sql`
        SELECT COALESCE(SUM(amount),0) as expenses FROM transactions
        WHERE user_id = ${userId}
        AND amount < 0
        `;

    res.status(200).json({
      balance: balance[0].balance,
      income: income[0].income,
      expenses: expenses[0].expenses,
    });
  } catch (error) {
    console.log("error in getting transactions summary", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
export const mutateTransactionController = async (req, res) => {
  try {
    const { title, amount, category, userId: user_id } = req.body;
    // console.log(req.body);
    if (!title || amount === 0 || !category || !user_id)
      return res.status(400).json({ message: "All fields are required" });

    const transaction = await sql`
      INSERT INTO transactions(user_id,title,amount,category)
      VALUES (${user_id},${title},${amount},${category})
      RETURNING *
      `;

    return res
      .status(201)
      .json({ message: "Transaction created", data: transaction[0] });
  } catch (error) {
    console.log("error in transaction mutation", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
export const deleteTransactionByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is required" });

    if (isNaN(parseInt(id))) {
      return res.status(401).json({ message: "Transaction Id is invalid" });
    }

    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (result.length > 0) {
      return res
        .status(200)
        .json({ message: "Transactions deleted", data: result });
    } else {
      return res.status(404).json({
        message: "No transactions found with the transaction id",
      });
    }
  } catch (error) {
    console.log("error in transaction deletion", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
