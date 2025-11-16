import { Link } from 'react-router-dom';
import { useHomePage } from '../context/useHomePage';
import { PlusIcon, TrashIcon } from '../components/Icons';
import { useState } from 'react';

export default function HomePage() {
  const { lists, addList, deleteList } = useHomePage();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [newListUsers, setNewListUsers] = useState(['A', 'C']); // Example users

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const openCreateModal = () => {
    setShowCreateModal(true);
    setNewListName('');
    setNewListDesc('');
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      addList(newListName.trim(), newListDesc.trim());
      setShowCreateModal(false);
    }
  };

  const openDeleteModal = (list) => {
    setListToDelete(list);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (listToDelete) {
      deleteList(listToDelete.id);
      setShowDeleteModal(false);
      setListToDelete(null);
    }
  };

  const CreateListModal = () => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={() => setShowCreateModal(false)}
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
          padding: '1.5rem',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Create a new List</h2>
          <button
            onClick={() => setShowCreateModal(false)}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#000' }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              Name
            </label>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Project"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              Description
            </label>
            <textarea
              value={newListDesc}
              onChange={(e) => setNewListDesc(e.target.value)}
              placeholder="Lorem Ipsum"
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Users
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {newListUsers.map((user, i) => (
                <span
                  key={i}
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: i === 0 ? '#3b82f6' : '#10b981',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  {user}
                </span>
              ))}
              <button
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: '#e5e7eb',
                  color: '#6b7280',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateList}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.875rem',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Create new list
        </button>
      </div>
    </div>
  );

  const DeleteConfirmModal = () => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={() => setShowDeleteModal(false)}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '380px',
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: '600' }}>
          Are you sure you want to delete this list?
        </h3>
        <p style={{ margin: '0 0 1.5rem', color: '#6b7280', fontSize: '0.95rem' }}>
          "{listToDelete?.name}" will be permanently removed.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={() => setShowDeleteModal(false)}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#e5e7eb',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 5vw',
        gap: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            B
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
            Shopping List
          </h1>
        </div>
        <button
          onClick={openCreateModal}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#2563eb',
            padding: '0.5rem',
          }}
        >
          <PlusIcon />
        </button>
      </header>

      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {lists.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '1rem', padding: '2rem 0' }}>
            No lists yet. Tap + to create one.
          </p>
        ) : (
          lists.map((list) => {
            const productCount = list.products.length;
            const doneCount = list.products.filter((p) => p.done).length;
            const displayName = list.name.length > 12 ? list.name.slice(0, 10) + '...' : list.name;

            return (
              <div
                key={list.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.5rem',
                    backgroundColor: list.id === '1' ? '#fef3c7' : list.id === '2' ? '#fce7f3' : '#e0e7ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  {list.id === '1' ? 'Home' : list.id === '2' ? 'Car' : 'List'}
                </div>

                <div style={{ flex: 1 }}>
                  <Link
                    to={`/list/${list.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>
                      {displayName}
                    </h3>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                      {productCount} product{productCount !== 1 ? 's' : ''}
                      {doneCount > 0 && ` • ${doneCount} done`}
                    </p>
                  </Link>
                </div>

                <button
                  onClick={() => openDeleteModal(list)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <TrashIcon />
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>

      {showCreateModal && <CreateListModal />}
      {showDeleteModal && <DeleteConfirmModal />}
    </div>
  );
}