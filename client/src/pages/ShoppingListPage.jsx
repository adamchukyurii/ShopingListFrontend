// src/pages/ShoppingListDetail.jsx
import { Link, useOutletContext } from 'react-router-dom';
import { useShoppingList } from '../context/useShoppingList';
import { useState } from 'react';
import { MenuIcon, ShareIcon, PlusIcon, TrashIcon, DotsIcon } from '../components/Icons';


export default function ShoppingListDetail() {
  const { list } = useOutletContext();
  const { addItem, toggleItem, deleteItem } = useShoppingList();
  const listId = list?.id;

  const [newItemText, setNewItemText] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [hideActions, setHideActions] = useState(false);

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', alignSelf: 'center'}}>Details</h2>
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
              &times;
            </button>
          </div>

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

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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

      <div style={{ padding: '2vw 5vw', width: '100%', maxWidth: '960px' }}>
        <h1 style={{ fontSize: 'calc(1.5rem + 1vw)', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          {list.name}
        </h1>
        <p style={{ fontSize: 'calc(0.8rem + 0.5vw)', color: '#6b7280', marginTop: '0.5rem' }}>
          Shopping list for {list.name === 'Home List' ? 'Home' : 'Home'}
        </p>
      </div>

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

        {list.products.length === 0 ? (
          <li style={{ textAlign: 'center', padding: '2rem 0', color: '#9ca3af', fontSize: '1rem' }}>
            No items yet. Tap + to add one.
          </li>
        ) : (
          list.products.map((item) => (
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
                  {item.name}
                </span>
              </label>

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

      {showDetail && <DetailModal />}
    </div>
  );
}