import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/api';

export default function Expenses(){
  const [members,setMembers]=useState('');
  const [expenses,setExpenses]=useState([{title:'',amount:'',paidBy:''}]);
  const [result,setResult]=useState(null);
  const [error,setError]=useState('');
  function update(i,k,v){const copy=[...expenses];copy[i][k]=v;setExpenses(copy)}
  async function calc(){
    setError('');
    const memberList=members.split(',').map(x=>x.trim()).filter(Boolean);
    const validExpenses=expenses.filter(e=>e.title && e.amount && e.paidBy);
    if(memberList.length<2 || validExpenses.length<1){setError('Enter at least 2 members and 1 expense.'); return;}
    const{data}=await api.post('/features/expense-split',{members:memberList,expenses:validExpenses});
    setResult(data);
  }
  return <><Navbar/><main className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">
    <section className="card">
      <h1 className="text-3xl font-bold">Group Expense Splitter</h1>
      <p className="text-slate-600 mt-2">Enter your group members and expenses. No default names are used.</p>
      {error && <p className="text-red-600 mt-3">{error}</p>}
      <input className="input mt-4" value={members} onChange={e=>setMembers(e.target.value)} placeholder="Members comma separated, e.g. Harsha, Ravi, Sai"/>
      {expenses.map((e,i)=><div className="grid grid-cols-3 gap-2 mt-3" key={i}>
        <input className="input" value={e.title} onChange={ev=>update(i,'title',ev.target.value)} placeholder="Expense"/>
        <input className="input" type="number" value={e.amount} onChange={ev=>update(i,'amount',ev.target.value)} placeholder="Amount"/>
        <input className="input" value={e.paidBy} onChange={ev=>update(i,'paidBy',ev.target.value)} placeholder="Paid by"/>
      </div>)}
      <button className="rounded-xl border px-4 py-2 mt-3" onClick={()=>setExpenses([...expenses,{title:'',amount:'',paidBy:''}])}>Add Expense</button>
      <button className="btn w-full mt-4" onClick={calc}>Calculate Split</button>
    </section>
    <section className="card"><h2 className="text-2xl font-bold">Result</h2>{!result?<p className="text-slate-500 mt-3">Split summary appears here.</p>:<div className="mt-4"><p>Total: ₹{result.total}</p><p>Each person share: ₹{result.perPerson}</p><div className="space-y-3 mt-4">{result.balances.map(b=><div className="bg-slate-50 p-3 rounded-xl" key={b.name}><b>{b.name}</b> paid ₹{b.paid}. Balance: <span className={b.balance>=0?'text-green-600':'text-red-600'}>{b.balance>=0?`gets ₹${b.balance}`:`pays ₹${Math.abs(b.balance)}`}</span></div>)}</div></div>}</section>
  </main></>;
}
