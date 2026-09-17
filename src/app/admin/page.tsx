"use client";

import { useState } from "react";
import { useItems } from "../../context/ItemsContext";
import ItemCard from "@/components/ItemCard";
import AddItemModal from "@/components/AddItemModal";
import { Item, NewItemInput } from "@/lib/types";

export default function AdminPage() {
  const { items, addItem, deleteItem } = useItems();
  const [showModal, setShowModal] = useState(false);

  function handleSave(newItem: NewItemInput) {
    addItem(newItem);
    setShowModal(false);
  }

  function handleDelete(item: Item) {
    const ok = window.confirm(`Remove "${item.name}" from the shop?`);
    if (ok) deleteItem(item.id);
  }

  return (
    <div className="page">
      <div className="page-header">
        <p className="page-eyebrow">Admin desk</p>
        <h1 className="page-title">Manage the shop</h1>
        <p className="page-subtitle">
          Add new produce or take something off the shelf. Changes show up on
          the shop page right away.
        </p>
      </div>

      <div className="item-grid">
        <button
          type="button"
          className="add-item-tile"
          onClick={() => setShowModal(true)}
        >
          <span>＋</span>
          Add new item
        </button>

        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            mode="admin"
            onDelete={() => handleDelete(item)}
          />
        ))}
      </div>

      {showModal && (
        <AddItemModal onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
}
