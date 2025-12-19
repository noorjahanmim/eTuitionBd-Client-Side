import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard, Calendar, BookOpen, DollarSign,
  CheckCircle, Clock, Search, ArrowUpRight
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/payments/student/${user.email}`)
      .then(res => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPayments([]);
        setLoading(false);
      });
  }, [user, axiosSecure]);

  const totalPaid = payments
    .filter(p => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="w-full min-h-screen">
      {/* Header & Stats */}
      <div className="flex justify-between mb-10">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <span className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
            <CreditCard size={28} />
          </span>
          Payment History
        </h2>
        <div className="bg-emerald-50 px-6 py-3 rounded-2xl">
          <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">Total Paid</span>
          <span className="text-xl font-black text-emerald-700">৳ {totalPaid.toFixed(2)}</span>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="text-center py-24">Loading...</div>
      ) : payments.length === 0 ? (
        <div className="text-center py-24">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 mb-1">No Transactions Yet</h3>
          <p className="text-slate-400 font-medium">
            Your payment history will appear here once you make a payment.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase">Date</th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase">Tuition</th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase">Amount</th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase">Status</th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {payments.map((p, index) => (
                <motion.tr key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-8 py-6">{p.date || new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-6">{p.tuition}</td>
                  <td className="px-8 py-6">৳{p.amount}</td>
                  <td className="px-8 py-6">
                    {p.status === "Paid" ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black border border-emerald-100">
                        <CheckCircle size={14} /> Success
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-black border border-amber-100">
                        <Clock size={14} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all border hover:border-slate-100">
                      <ArrowUpRight size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payments;
