import { useState } from 'react'

export default function SidePanel({ open, editor, stats }) {
  const [tab, setTab] = useState('tools')

  return (
    <aside className={`side-panel ${open ? 'open' : ''}`}>
      <div className="side-panel-inner">
        <div className="panel-top">
          <div className="panel-title">قلم</div>
          <div className="panel-caption">ویرایشگر فارسی</div>
        </div>

        <div className="panel-tabs">
          <button className={tab === 'tools' ? 'active' : ''} onClick={() => setTab('tools')}>ابزار</button>
          <button className={tab === 'about' ? 'active' : ''} onClick={() => setTab('about')}>درباره</button>
          <button className={tab === 'roadmap' ? 'active' : ''} onClick={() => setTab('roadmap')}>مسیر</button>
        </div>

        {tab === 'tools' && (
          <div className="panel-section">
            <div className="section-label">قالب متن</div>
            <div className="tool-row">
              <button onClick={() => editor?.chain().focus().toggleBold().run()}>پررنگ</button>
              <button onClick={() => editor?.chain().focus().toggleItalic().run()}>مورب</button>
              <button onClick={() => editor?.chain().focus().toggleStrike().run()}>خط‌خورده</button>
            </div>
            <div className="tool-row">
              <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>عنوان ۱</button>
              <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>عنوان ۲</button>
            </div>
            <div className="tool-row">
              <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>فهرست</button>
              <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>شماره‌دار</button>
            </div>
            <div className="tool-row">
              <button onClick={() => editor?.chain().focus().undo().run()}>بازگشت</button>
              <button onClick={() => editor?.chain().focus().redo().run()}>تکرار</button>
            </div>

            <div className="section-label" style={{marginTop: '8px'}}>هوش مصنوعی</div>
            <div className="panel-note">
              پیشنهاد خاکستری را با <strong>Tab</strong> بپذیرید و با <strong>Esc</strong> رد کنید.
            </div>

            <div className="section-label" style={{marginTop: '8px'}}>آمار</div>
            <div className="stats-box">
              <div><span>کلمات</span><strong>{stats.words}</strong></div>
              <div><span>کاراکتر</span><strong>{stats.chars}</strong></div>
            </div>
          </div>
        )}

        {tab === 'about' && (
          <div className="panel-section">
            <div className="section-label">درباره</div>
            <p className="panel-text">قلم یک ویرایشگر مینیمال فارسی است؛ آرام، راست‌به‌چپ، و بدون شلوغی.</p>
            <p className="panel-text">نشانه‌های ایرانی-اسلامی در آن بسیار کم‌رنگ و فقط در حس کلی فضا حضور دارند.</p>
          </div>
        )}

        {tab === 'roadmap' && (
          <div className="panel-section">
            <div className="section-label">نقشه راه</div>
            <ul className="roadmap-list">
              <li>ردیابی نسخه‌ها با نمایش تفاوت متن</li>
              <li>ویرایش هم‌زمان چندکاربره</li>
              <li>ذخیره‌سازی ابری و همگام‌سازی بین دستگاه‌ها</li>
            </ul>
          </div>
        )}
      </div>
    </aside>
  )
}
