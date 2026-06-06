import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { Lock } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";
import api from "../api/axios";
import toast from "react-hot-toast";

const Setting = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile")
      const profileData = res.data;

      if(profileData){ setProfile(profileData) }
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    }finally {
      setLoading(false)
    }} 
  
  
  useEffect(() => {
    fetchProfile()
  }, [])  

  if(loading) return <Loading />

  return (
    <>
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title"> Settings </h1>
        <p className="page-subtitle"> Manage Your Account & Preferences </p>
      </div>

      {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}

      {/* Change Password Trigger */}
      <div className="card max-w-md p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 rounded-lg">
            <Lock className="w-5 h-5 text-slate-600"/>
          </div>
          <div>
          <p className="font-medium text-slate-800">Password</p>
          <p className="text-sm text-slate-500">Update Your Acc. Password</p>
          </div>
        </div>
        <button onClick={() => setShowPasswordModal(true)} className="btn-secondary text-sm">Change</button>
      </div>

      <ChangePasswordModal open={showPasswordModal} onClose={() => setShowPasswordModal(false)} />

    </div>
    </>
  )
}

export default Setting
