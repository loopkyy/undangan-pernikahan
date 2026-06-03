import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ChevronDown, User, Phone, Mail, MapPin, Heart } from 'lucide-react'
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
    hp: '',
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

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,11}$/
    return phoneRegex.test(phone)
  }

  const validateEmail = (email) => {
    if (!email) return true
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = () => {
    const newErrors = { nama: '', hp: '', ucapan: '', email: '' }
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
    
    if (!form.hp.trim()) {
      newErrors.hp = 'Nomor HP harus diisi'
      isValid = false
    } else if (!validatePhoneNumber(form.hp.trim())) {
      newErrors.hp = 'Format nomor HP tidak valid'
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
    
    if (form.email.trim() && !validateEmail(form.email.trim())) {
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
    
    const lastSend = localStorage.getItem('lastSendTime')
    const now = Date.now()
    
    if (lastSend && now - lastSend < 30000) {
      const remaining = Math.ceil((30000 - (now - lastSend)) / 1000)
      alert(`Tunggu ${remaining} detik sebelum kirim lagi`)
      return
    }
    
    if (loading) return
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      await addDoc(collection(db, "wishes"), {
        nama: form.nama.trim(),
        hp: form.hp.trim(),
        email: form.email.trim() || null,
        kehadiran: form.kehadiran,
        ucapan: form.ucapan.trim(),
        deviceId: getDeviceId(),
        createdAt: serverTimestamp(),
        waktu: new Date().toLocaleString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      })
      
      localStorage.setItem('lastSendTime', now.toString())
      
      setForm({
        nama: '',
        hp: '',
        email: '',
        kehadiran: 'Hadir',
        ucapan: ''
      })
      
      setErrors({
        nama: '',
        hp: '',
        ucapan: '',
        email: ''
      })
      
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
      
      alert("Terima kasih atas ucapan dan doanya")
      
    } catch (error) {
      console.error("Error:", error)
      alert("Gagal mengirim ucapan. Silakan coba lagi")
    } finally {
      setLoading(false)
    }
  }

  // Status badge style
  const getStatusStyle = (kehadiran) => {
    switch(kehadiran) {
      case 'Hadir':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      case 'Tidak Hadir':
        return 'bg-rose-50 text-rose-700 border border-rose-200'
      default:
        return 'bg-amber-50 text-amber-700 border border-amber-200'
    }
  }

  const getStatusText = (kehadiran) => {
    switch(kehadiran) {
      case 'Hadir': return 'Hadir'
      case 'Tidak Hadir': return 'Tidak Hadir'
      default: return 'Ragu'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 md:py-20 px-4 bg-gradient-to-b from-pink-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-4 text-[#c9a87c]">
            <MessageCircle size={36} strokeWidth={1.5} className="mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl text-[#4a3728] mb-3 font-light tracking-wide">
            Ucapan & Doa
          </h2>
          <div className="w-12 h-px bg-[#c9a87c] mx-auto"></div>
          <p className="text-[#8b7a6a] text-sm mt-4 max-w-md mx-auto">
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-16 border border-[#c9a87c]/20"
        >
          {/* Nama */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <User size={16} className="text-[#c9a87c]" />
              <label className="text-[#4a3728] text-sm">Nama Lengkap</label>
              <span className="text-red-400 text-xs">*</span>
            </div>
            <input
              type="text"
              placeholder="Nama lengkap Anda"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className={`w-full p-3 rounded-xl border ${
                errors.nama ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              } focus:outline-none focus:border-[#c9a87c] focus:bg-white transition-colors`}
            />
            {errors.nama && (
              <p className="text-red-400 text-xs mt-1">{errors.nama}</p>
            )}
          </div>

          {/* No HP */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={16} className="text-[#c9a87c]" />
              <label className="text-[#4a3728] text-sm">Nomor WhatsApp</label>
              <span className="text-red-400 text-xs">*</span>
            </div>
            <input
              type="tel"
              placeholder="081234567890"
              value={form.hp}
              onChange={(e) => setForm({ ...form, hp: e.target.value })}
              className={`w-full p-3 rounded-xl border ${
                errors.hp ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              } focus:outline-none focus:border-[#c9a87c] focus:bg-white transition-colors`}
            />
            {errors.hp && (
              <p className="text-red-400 text-xs mt-1">{errors.hp}</p>
            )}
          </div>

          {/* Email - Opsional */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-[#c9a87c]" />
              <label className="text-[#4a3728] text-sm">Email</label>
              <span className="text-gray-400 text-xs">(Opsional)</span>
            </div>
            <input
              type="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full p-3 rounded-xl border ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              } focus:outline-none focus:border-[#c9a87c] focus:bg-white transition-colors`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Kehadiran - Minimalis tanpa emoji */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-[#c9a87c]" />
              <label className="text-[#4a3728] text-sm">Konfirmasi Kehadiran</label>
            </div>
            <div className="relative">
              <select
                value={form.kehadiran}
                onChange={(e) => setForm({ ...form, kehadiran: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#c9a87c] focus:bg-white transition-colors appearance-none cursor-pointer"
              >
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Ragu">Masih Ragu</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Ucapan */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-[#c9a87c]" />
              <label className="text-[#4a3728] text-sm">Ucapan & Doa</label>
              <span className="text-red-400 text-xs">*</span>
            </div>
            <textarea
              placeholder="Tuliskan ucapan dan doa terbaik untuk mempelai..."
              value={form.ucapan}
              onChange={(e) => setForm({ ...form, ucapan: e.target.value })}
              rows="4"
              className={`w-full p-3 rounded-xl border ${
                errors.ucapan ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
              } focus:outline-none focus:border-[#c9a87c] focus:bg-white transition-colors resize-none`}
            />
            <div className="flex justify-between mt-1">
              {errors.ucapan ? (
                <p className="text-red-400 text-xs">{errors.ucapan}</p>
              ) : (
                <p className="text-gray-400 text-xs">Minimal 5 karakter</p>
              )}
              <p className={`text-xs ${form.ucapan.length > 500 ? 'text-red-400' : 'text-gray-400'}`}>
                {form.ucapan.length}/500
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
              loading || cooldown > 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#c9a87c] text-white hover:bg-[#b89364] active:scale-[0.98]'
            }`}
          >
            {loading ? 'Mengirim...' : 
             cooldown > 0 ? `Tunggu ${cooldown} detik` : 
             'Kirim Ucapan'}
          </button>
        </motion.form>

        {/* Daftar Ucapan */}
        <div>
          <h3 className="text-xl md:text-2xl text-[#4a3728] text-center font-light mb-8">
            Tanda Kasih dari Keluarga & Sahabat
          </h3>
          
          {wishes.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <Heart size={32} className="mx-auto mb-3 opacity-30" />
              <p>Belum ada ucapan</p>
              <p className="text-sm mt-1">Jadilah yang pertama memberikan doa</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                    <div>
                      <h4 className="font-medium text-[#4a3728]">{wish.nama}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{wish.hp}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(wish.kehadiran)}`}>
                      {getStatusText(wish.kehadiran)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">{wish.ucapan}</p>
                  <p className="text-xs text-gray-400">{wish.waktu}</p>
                </motion.div>
              ))}
            </div>
          )}

          {hasMore && wishes.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-6 py-2 text-[#8b7a6a] hover:text-[#4a3728] transition-colors text-sm disabled:opacity-50"
              >
                {loadingMore ? 'Memuat...' : 'Lihat Selengkapnya ↓'}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Wishes