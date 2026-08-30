import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  UserRound,
  X,
} from 'lucide-react'

type AuthMode = 'login' | 'register'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

export function AuthModal({ isOpen, onClose, onSubmit }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
      setIsVisible(true)
      return
    }

    if (!isVisible) return

    setIsClosing(true)
    const timeoutId = window.setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 220)

    return () => window.clearTimeout(timeoutId)
  }, [isOpen, isVisible])

  const submitLabel = useMemo(
    () => (mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'),
    [mode],
  )

  if (!isVisible) return null

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div className={`auth-overlay ${isClosing ? 'auth-overlay--closing' : ''}`} onClick={onClose}>
      <div className={`auth-modal auth-modal--compact ${isClosing ? 'auth-modal--closing' : ''}`} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="auth-close-button" onClick={onClose} aria-label="Đóng popup">
          <X size={18} />
        </button>

        <section className="auth-panel auth-panel--compact">
          <div className="auth-tabs" aria-label="Chế độ đăng nhập">
            <button
              type="button"
              className={mode === 'login' ? 'is-active' : ''}
              onClick={() => setMode('login')}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              className={mode === 'register' ? 'is-active' : ''}
              onClick={() => setMode('register')}
            >
              Đăng ký
            </button>
          </div>

          <div className="auth-header">
            <div className="auth-icon"><GraduationCap size={20} /></div>
            <div>
              <h2>{mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</h2>
              <p>
                {mode === 'login'
                  ? 'Đăng nhập để tiếp tục trải nghiệm.'
                  : 'Hoàn tất thông tin để bắt đầu sử dụng.'}
              </p>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <label className="field-group">
                <span>Họ và tên</span>
                <div className="input-shell">
                  <UserRound size={16} />
                  <input type="text" placeholder="Nguyễn Văn A" defaultValue="Nguyễn Văn A" />
                </div>
              </label>
            )}

            <label className="field-group">
              <span>Email</span>
              <div className="input-shell">
                <Mail size={16} />
                <input type="email" placeholder="email@domain.com" defaultValue="NguyenVanA@muce.edu.vn" />
              </div>
            </label>

            <label className="field-group">
              <span>Mật khẩu</span>
              <div className="input-shell password-shell">
                <LockKeyhole size={16} />
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" defaultValue="password123" />
                <button type="button" className="password-toggle" aria-label="Hiện mật khẩu" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {mode === 'register' && (
              <label className="field-group">
                <span>Nhập lại mật khẩu</span>
                <div className="input-shell password-shell">
                  <LockKeyhole size={16} />
                  <input type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" defaultValue="password123" />
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label="Hiện lại mật khẩu"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>
            )}

            <div className="auth-meta-row">
              {mode === 'login' ? (
                <label className="remember-me">
                  <input type="checkbox" defaultChecked />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
              ) : (
                <span className="helper-text">Bằng cách tạo tài khoản, bạn đồng ý với điều khoản sử dụng.</span>
              )}
              {mode === 'login' && <button type="button" className="link-button">Quên mật khẩu?</button>}
            </div>

            <button type="submit" className="auth-submit-button">
              {submitLabel}
              <ArrowRight size={16} />
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
