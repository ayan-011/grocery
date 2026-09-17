"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { NewItemInput } from "@/lib/types";

interface FormState {
  name: string;
  unit: string;
  price: string;
  discount: string;
  image: string | null;
}

const EMPTY_FORM: FormState = {
  name: "",
  unit: "",
  price: "",
  discount: "",
  image: null,
};

interface AddItemModalProps {
  onClose: () => void;
  onSave: (item: NewItemInput) => void;
}

export default function AddItemModal({ onClose, onSave }: AddItemModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("image", reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Give the item a name.");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setError("Enter a price greater than 0.");
      return;
    }
    onSave({
      name: form.name.trim(),
      unit: form.unit.trim() || "1 kg",
      price: Number(form.price),
      discount: Number(form.discount) || 0,
      image: form.image,
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add a new item</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="photo-upload">
            {form.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="Preview" className="photo-preview" />
            ) : (
              <span className="photo-placeholder">
                <span>📷</span>
                Upload photo
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              hidden
            />
          </label>

          <div className="field">
            <label htmlFor="name">Vegetable name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Green Beans"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="unit">Unit</label>
            <input
              id="unit"
              type="text"
              placeholder="e.g. 500 g"
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="40"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="discount">Discount (%)</label>
              <input
                id="discount"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={form.discount}
                onChange={(e) => update("discount", e.target.value)}
              />
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
