import { Bell, Menu } from 'lucide-react'
import { Brand } from '../ui/Brand'

interface HeaderProps { onOpenMenu: () => void }

export function Header({ onOpenMenu }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="mobile-brand-row">
        <button className="icon-button menu-button" type="button" onClick={onOpenMenu} title="Mở menu"><Menu size={21} /></button>
        <Brand />
      </div>
      <div className="assistant-status">
        <div className="assistant-avatar">MA</div>
        <div><strong>Mai Anh · Trợ lý MUCE</strong><span><i /> Đang trực tuyến</span></div>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" type="button" title="Thông báo"><Bell size={19} /><span className="notification-dot" /></button>
        <button className="login-button" type="button">Đăng nhập</button>
      </div>
    </header>
  )
}
