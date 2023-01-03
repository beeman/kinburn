import { createAccount } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { FC, useState } from "react"
import styles from "../styles/Home.module.css"
import { BONK_MINT } from "../utils/constants";
import { createInitBurnAccountIx } from "../utils/instructions";
import { generateExplorerUrl } from "../utils/solana";
import { useWorkspace } from "./WorkspaceProvider";

interface NewUserProps {
  onInit: () => void,
}

const NewUser: FC<NewUserProps> = (props:NewUserProps) => {
  const [burnAmount, setBurnAmount] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { connection } = useConnection();
  const { burnBoardProgram } = useWorkspace();
  const walletAdapter = useWallet();

  const updateNumber = () => {
    
  }
  const handleCreateAccount = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Make sure input is string and eliminate whitespace
    let inputUserName = userName.toString().trim();

    if (inputUserName.length < 0) {
      setError('Name is too short');
      return;
    }
    if (inputUserName.length > 8) {
      setError('Name is too long');
      return;
    }
    createAccount(inputUserName);
    setError('');
  }
  const createAccount = async (username: string) => {
    if (!burnBoardProgram) throw new Error('No Program Found');
    if (!walletAdapter.publicKey || !walletAdapter) throw new Error('No PubKey Found');
    const transaction = new Transaction;
    let txInstructions = await createInitBurnAccountIx(
      burnBoardProgram,
      walletAdapter.publicKey,
      BONK_MINT,
      userName
    );
    transaction.add(txInstructions);

    // Step 1 - Fetch Latest Blockhash
    let latestBlockhash = await connection.getLatestBlockhash('finalized');
    console.log("   ✅ - Fetched latest blockhash. Last Valid Height:", latestBlockhash.lastValidBlockHeight);

    let signature = await walletAdapter.sendTransaction(transaction, connection)

    let confirmation = await connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
    });
    if (confirmation.value.err) throw new Error("Error: Could not confirm transaction");
    console.log('   ✅ - Success!', generateExplorerUrl(signature));
    props.onInit();
  }
  return (
    <form onSubmit={handleCreateAccount}>
      <div className="buttonHolder">

          <button type="submit">Join the Bonk Fire</button><br/>

    <label>
      Username  <small>(optional) </small></label><br/>
      <input
        name="userName"
        id="enterName"
        type="text"
        maxLength={8}
        value={userName}
        onChange={(e) => setUserName(e.target.value)} />
    </div>
  </form>
  )
}

export default NewUser;

