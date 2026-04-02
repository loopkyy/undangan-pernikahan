import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { db } from '../config/firebase'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  limit,
  startAfter,
  getDocs,
  serverTimestamp
} from 'firebase/firestore'

const Wishes = () => {
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [lastDoc, setLastDoc] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [cooldown, setCooldown] = useState(0)

  const [form, setForm] = useState({
    nama: '',
    hp: '',
    email: '',
    kehadiran: 'Hadir',
    ucapan: ''
  })

  const [errors, setErrors] = useState({
    nama: '',
    ucapan: '',
    email: ''
  })

  const getDeviceId = () => {
    let id = localStorage.getItem('deviceId')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('deviceId', id)
    }
    return id
  }

  const validateForm = () => {
    const newErrors = { nama: '', ucapan: '', email: '' }
    let isValid = true
    
    if (!form.nama.trim()) {
      newErrors.nama = 'Nama harus diisi'
      isValid = false
    } else if (form.nama.trim().length < 2) {
      newErrors.nama = 'Nama minimal 2 karakter'
      isValid = false
    } else if (form.nama.trim().length > 50) {
      newErrors.nama = 'Nama maksimal 50 karakter'
      isValid = false
    }
    
    if (!form.ucapan.trim()) {
      newErrors.ucapan = 'Ucapan harus diisi'
      isValid = false
    } else if (form.ucapan.trim().length < 5) {
      newErrors.ucapan = 'Ucapan minimal 5 karakter'
      isValid = false
    } else if (form.ucapan.trim().length > 500) {
      newErrors.ucapan = 'Ucapan maksimal 500 karakter'
      isValid = false
    }
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Format email tidak valid'
      isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  useEffect(() => {
    const q = query(
      collection(db, "wishes"),
      orderBy("createdAt", "desc"),
      limit(5)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newWishes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setWishes(newWishes)
      setLastDoc(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === 5)
    })

    return () => unsubscribe()
  }, [])

  const loadMore = async () => {
    if (!lastDoc || loadingMore) return
    setLoadingMore(true)
    try {
      const q = query(
        collection(db, "wishes"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(5)
      )
      const snapshot = await getDocs(q)
      const moreWishes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setWishes(prev => [...prev, ...moreWishes])
      setLastDoc(snapshot.docs[snapshot.docs.length - 1])
      setHasMore(snapshot.docs.length === 5)
    } catch (error) {
      console.error("Error loading more:", error)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Cek cooldown (berdasarkan localStorage, bukan server)
    const lastSend = localStorage.getItem('lastSendTime')
    const now = Date.now()
    
    if (lastSend && now - lastSend < 30000) {
      const remaining = Math.ceil((30000 - (now - lastSend)) / 1000)
      alert(`Tunggu ${remaining} detik sebelum kirim lagi ya 😅`)
      return
    }
    
    if (loading) return
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      await addDoc(collection(db, "wishes"), {
        nama: form.nama.trim(),
        hp: form.hp.trim() || null,
        email: form.email.trim() || null,
        kehadiran: form.kehadiran,
        ucapan: form.ucapan.trim(),
        deviceId: getDeviceId(),
        createdAt: serverTimestamp(),
        waktu: new Date().toLocaleString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      })
      
      // Simpan waktu terakhir kirim
      localStorage.setItem('lastSendTime', now.toString())
      
      // Reset form
      setForm({
        nama: '',
        hp: '',
        email: '',
        kehadiran: 'Hadir',
        ucapan: ''
      })
      
      // Set cooldown timer untuk UI
      setCooldown(30)
      const timer = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
    } catch (error) {
      console.error("Error:", error)
      alert("Gagal mengirim ucapan. Coba lagi ya!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container min-h-screen flex items-center justify-center relative"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-5 text-[#c9a87c]">
            <MessageCircle size={36} strokeWidth={1} className="mx-auto" />
          </div>
          <h2 className="text-4xl text-[#4a3728] mb-4 font-light tracking-wide">
            Ucapan & Doa
          </h2>
          <div className="w-16 h-px bg-[#c9a87c] mx-auto"></div>
        </div>

        <motion.form
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-white/40 backdrop-blur-md p-10 rounded-3xl border shadow-xl mb-20"
        >
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <input
                type="text"
                placeholder="Nama Lengkap *"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className={`p-3 rounded-2xl w-full border ${
                  errors.nama ? 'border-red-500' : 'border-gray-200'
                } focus:outline-none focus:border-[#c9a87c]`}
              />
              {errors.nama && (
                <small className="text-red-500 text-sm mt-1 block">{errors.nama}</small>
              )}
              <small className="text-gray-500">Minimal 2 karakter</small>
            </div>
            <input
              type="tel"
              placeholder="No. HP (opsional)"
              value={form.hp}
              onChange={(e) => setForm({ ...form, hp: e.target.value })}
              className="p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#c9a87c]"
            />
          </div>

          <input
            type="email"
            placeholder="Email (opsional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full p-3 rounded-2xl mb-5 border ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:border-[#c9a87c]`}
          />
          {errors.email && (
            <small className="text-red-500 text-sm -mt-4 mb-3 block">{errors.email}</small>
          )}

          <select
            value={form.kehadiran}
            onChange={(e) => setForm({ ...form, kehadiran: e.target.value })}
            className="w-full p-3 rounded-2xl mb-5 border border-gray-200 focus:outline-none focus:border-[#c9a87c]"
          >
            <option value="Hadir">Hadir</option>
            <option value="Tidak Hadir">Tidak Hadir</option>
            <option value="Ragu">Ragu</option>
          </select>

          <div>
            <textarea
              placeholder="Ucapan & Doa * (minimal 5 karakter)"
              value={form.ucapan}
              onChange={(e) => setForm({ ...form, ucapan: e.target.value })}
              rows="4"
              className={`w-full p-3 rounded-2xl mb-2 border ${
                errors.ucapan ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:border-[#c9a87c]`}
            />
            {errors.ucapan && (
              <small className="text-red-500 text-sm block">{errors.ucapan}</small>
            )}
            <small className="text-gray-500">{form.ucapan.length}/500 karakter</small>
          </div>

          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className={`w-full bg-[#c9a87c] text-white py-3 rounded-2xl mt-4 transition-all ${
              (loading || cooldown > 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#b8966a]'
            }`}
          >
            {loading ? 'Mengirim...' : 
             cooldown > 0 ? `Tunggu ${cooldown} detik` : 
             'Kirim Ucapan'}
          </button>
        </motion.form>

        <div className="space-y-6">
          {wishes.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Belum ada ucapan. Jadilah yang pertama!
            </div>
          ) : (
            wishes.map((wish) => (
              <div key={wish.id} className="bg-white/40 p-6 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-[#4a3728]">{wish.nama}</span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    wish.kehadiran === 'Hadir' ? 'bg-green-100 text-green-700' :
                    wish.kehadiran === 'Tidak Hadir' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {wish.kehadiran}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{wish.ucapan}</p>
                <small className="text-gray-400">{wish.waktu}</small>
              </div>
            ))
          )}
        </div>

        {hasMore && wishes.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="px-6 py-2 bg-white/60 rounded-full hover:bg-white/80 transition-all disabled:opacity-50"
            >
              {loadingMore ? 'Loading...' : 'Lihat Lebih Banyak'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Wishes