'use client';
import { useState } from 'react';
import axios from 'axios';
import { Search, Plus, Minus, User as UserIcon, Wallet } from 'lucide-react';

export default function SufiyanPanel() {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ msg: '', type: '' });

  const API_URL = 'http://localhost:5000/api/admin';

  const findUser = async () => {
    if (!email) return;
    setLoading(true);
    setStatus({ msg: '', type: '' });
    try {
      const res = await axios.get(`${API_URL}/user/${email}`);
      setUserData(res.data);
    } catch (err: any) {
      setUserData(null);
      setStatus({ msg: 'User Not Found!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (type: 'add' | 'deduct') => {
    if (!amount || isNaN(Number(amount))) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/update-balance`, {
        userId: userData._id,
        amount: Number(amount),
        type
      });
      setUserData({ ...userData, coins: res.data.newBalance });
      setAmount('');
      setStatus({ msg: `Successfully ${type === 'add' ? 'added' : 'deducted'} coins!`, type: 'success' });
    } catch (err) {
      setStatus({ msg: 'Transaction failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 border-l-4 border-viator-primary pl-4">
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Coin Control Hub <small className="text-sm text-gray-500 block">Logged as Sufiyan</small></h1>
        </header>

        {/* Search Bar */}
        <div className="glass-card p-6 rounded-2xl flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-lg"
              placeholder="Search user by email (e.g. player@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && findUser()}
            />
          </div>
          <button 
            onClick={findUser}
            disabled={loading}
            className="bg-viator-primary px-8 py-2 rounded-lg font-bold hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Status Messages */}
        {status.msg && (
          <div className={`mb-6 p-4 rounded-lg text-center font-semibold ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {status.msg}
          </div>
        )}

        {/* User Stats Card */}
        {userData ? (
          <div className="glass-card p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-viator-primary/20 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-viator-primary" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">User Identity</p>
                  <h2 className="text-xl font-bold">{userData.email}</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Current Balance</p>
                <div className="flex items-center gap-2 justify-end">
                  <Wallet className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-3xl font-black text-white">{userData.coins.toLocaleString()}</h2>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold uppercase text-gray-400">Instruction Amount</label>
                <input 
                  type="number" 
                  className="w-full text-2xl font-bold p-4 rounded-xl text-center"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="flex items-end gap-4">
                <button 
                  onClick={() => handleUpdate('add')}
                  disabled={loading || !amount}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-[64px] rounded-xl flex items-center justify-center gap-2 font-bold transition-all transform active:scale-95"
                >
                  <Plus /> Add Coins
                </button>
                <button 
                  onClick={() => handleUpdate('deduct')}
                  disabled={loading || !amount}
                  className="flex-1 bg-viator-primary hover:bg-red-700 h-[64px] rounded-xl flex items-center justify-center gap-2 font-bold transition-all transform active:scale-95"
                >
                  <Minus /> Deduct
                </button>
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20 opacity-20">
              <UserIcon className="w-24 h-24 mx-auto mb-4" />
              <p className="text-xl">Lookup a user to manage balance</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
