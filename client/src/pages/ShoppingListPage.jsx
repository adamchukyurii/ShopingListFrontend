// src/pages/ShoppingListDetail.jsx
import { Link } from 'react-router-dom';
import { useShoppingList } from '../context/useShoppingList';
import { useState } from 'react';

// === SVG Icons (unchanged + DotsIcon) ===
const MenuIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const ShareIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);
const PlusIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);
const TrashIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a1 1 0 00-1-1h-4a1 1 0 00-1 1v2M9 5h6"
    />
  </svg>
);
const DotsIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
    />
  </svg>
);

export default function ShoppingListDetail() {
  const { lists, addItem, toggleItem, deleteItem } = useShoppingList();
  const list = lists[0];
  const listId = list?.id;

  const [newItemText, setNewItemText] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [hideActions, setHideActions] = useState(false); // NEW: toggle state

  if (!list) {
    return (
      <div style={{ padding: '2vw', textAlign: 'center' }}>
        <p style={{ color: '#6b7280' }}>List not found</p>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (newItemText.trim()) {
      addItem(listId, newItemText.trim());
      setNewItemText('');
    }
  };

  // === Detail Modal with "Hide Actions" Button ===
  const DetailModal = () => {
    const today = new Date().toLocaleDateString('en-GB');

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          color: 'rgba(0, 0, 0)'
        }}
        onClick={() => setShowDetail(false)}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '420px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            position: 'relative',
            padding: '1.5rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Detail</h2>
            <button
              onClick={() => setShowDetail(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#000',
              }}
            >
              times
            </button>
          </div>

          {/* Fields */}
          <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600' }}>Name</span>
              <span>{list.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600' }}>Created at</span>
              <span>{today}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600' }}>Created by</span>
              <span>botmoedano</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600' }}>Description</span>
              <span>Shopping list for Home</span>
            </div>

            {/* Users – hidden when hideActions is true */}
            {!hideActions && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>Users</span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <span
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                    }}
                  >
                    A
                  </span>
                  <span
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                    }}
                  >
                    C
                  </span>
                  <span
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      backgroundColor: '#f59e0b',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                    }}
                  >
                    +
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* NEW: Hide Actions Button */}
            <button
              onClick={() => setHideActions(!hideActions)}
              style={{
                flex: 1,
                minWidth: '100px',
                padding: '0.75rem',
                backgroundColor: hideActions ? '#e5e7eb' : '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.9rem',
              }}
            >
              {hideActions ? 'Show Actions' : 'Hide Actions'}
            </button>

            {/* Edit Button – only show if not hidden */}
            {!hideActions && (
              <button
                style={{
                  flex: 1,
                  minWidth: '100px',
                  padding: '0.75rem',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Edit
              </button>
            )}

            {/* Delete Button – only show if not hidden */}
            {!hideActions && (
              <button
                style={{
                  flex: 1,
                  minWidth: '100px',
                  padding: '0.75rem',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: '#fff',
          boxShadow: '0 0.1rem 0.3rem rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem 5vw',
        }}
      >
        <button
          style={{
            padding: '0.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#374151',
          }}
        >
          <MenuIcon />
        </button>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            style={{
              padding: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
            }}
          >
            <ShareIcon />
          </button>

          {/* Detail button */}
          <button
            onClick={() => setShowDetail(true)}
            style={{
              padding: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
            }}
          >
            <DotsIcon />
          </button>
        </div>
      </header>

      {/* Title */}
      <div style={{ padding: '2vw 5vw', width: '100%', maxWidth: '960px' }}>
        <h1 style={{ fontSize: 'calc(1.5rem + 1vw)', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          {list.name}
        </h1>
        <p style={{ fontSize: 'calc(0.8rem + 0.5vw)', color: '#6b7280', marginTop: '0.5rem' }}>
          Shopping list for {list.name === 'Home List' ? 'Home' : 'Home'}
        </p>
      </div>

      {/* Add-item row */}
      <div style={{ padding: '2vw 5vw', width: '100%', maxWidth: '960px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: '0.5rem',
            boxShadow: '0 0.1rem 0.3rem rgba(0,0,0,0.1)',
            border: '1px solid #d1d5db',
            overflow: 'hidden',
          }}
        >
          <input
            type="text"
            placeholder="Add an item..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              border: 'none',
              outline: 'none',
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: '0.75rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#2563eb',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#dbeafe')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* Items list */}
      <ul
        style={{
          marginTop: '1.5rem',
          padding: '0 5vw 8rem',
          listStyle: 'none',
          width: '100%',
          maxWidth: '960px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        {list.items.length === 0 ? (
          <li style={{ textAlign: 'center', padding: '2rem 0', color: '#9ca3af', fontSize: '1rem' }}>
            No items yet. Tap + to add one.
          </li>
        ) : (
          list.items.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 0.1rem 0.3rem rgba(0,0,0,0.1)',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleItem(listId, item.id)}
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    marginRight: '0.75rem',
                    accentColor: '#2563eb',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                  }}
                />
                <span
                  style={{
                    fontSize: '1rem',
                    textDecoration: item.done ? 'line-through' : 'none',
                    color: item.done ? '#9ca3af' : '#111827',
                  }}
                >
                  {item.text}
                </span>
              </label>

              {/* Delete button in list – always visible (independent of modal) */}
              {item.done && (
                <button
                  onClick={() => deleteItem(listId, item.id)}
                  style={{
                    marginLeft: 'auto',
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#dc2626',
                    borderRadius: '50%',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <TrashIcon />
                </button>
              )}
            </li>
          ))
        )}
      </ul>

      {/* Render modal */}
      {showDetail && <DetailModal />}
    </div>
  );
}