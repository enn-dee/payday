function BalanceCard({ balance }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full p-6 text-white font-mono bg-slate-700">
        <div className="bg-slate-600 p-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl mb-2">Available Balance</h2>

          <p className="text-2xl font-bold text-green-400">
            ₹ {balance.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
}

export default BalanceCard;
