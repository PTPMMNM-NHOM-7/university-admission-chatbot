import { CircleHelp, LogIn, MessageSquareText, PanelLeftClose, Plus } from 'lucide-react'
import { recentConversations } from '../../data/admission'
import { Brand } from '../ui/Brand'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onNewConversation: () => void
  onHelpCenter: () => void
  onLogin: () => void
}

export function Sidebar({ isOpen, onClose, onNewConversation, onHelpCenter, onLogin }: SidebarProps) {
  return (
    <>
      <button className={`sidebar-backdrop ${isOpen ? 'is-visible' : ''}`} type="button" aria-label="Đóng menu" onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar-header">
          <Brand />
          <button className="icon-button sidebar-close" type="button" onClick={onClose} title="Đóng menu"><PanelLeftClose size={19} /></button>
        </div>
        <button className="new-chat-button" type="button" onClick={onNewConversation}><Plus size={18} />Cuộc trò chuyện mới</button>
        <nav className="conversation-nav" aria-label="Lịch sử trò chuyện">
          <p className="nav-label">Gần đây</p>
          {recentConversations.map((conversation, index) => (
            <button className={index === 0 ? 'is-active' : ''} type="button" key={conversation}>
              <MessageSquareText size={17} /><span>{conversation}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-link" type="button" onClick={onHelpCenter}><CircleHelp size={18} />Trung tâm hỗ trợ</button>
          <div className="account-box">
            <div className="avatar">K</div>
            <div><strong>Khách</strong><span>Chưa đăng nhập</span></div>
            <button className="icon-button" type="button" title="Đăng nhập" onClick={onLogin}><LogIn size={18} /></button>
          </div>
          <span className="app-version">v1.0.2</span>
        </div>
      </aside>
    </>
  )
}
