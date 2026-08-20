'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface AddAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddAccount?: (account: any) => void;
}

export default function AddAccountModal({ isOpen, onClose, onAddAccount }: AddAccountModalProps) {
    const [name, setName] = useState('');
    const [type, setType] = useState('Bank');
    const [balance, setBalance] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onAddAccount) {
            onAddAccount({ name, type, balance: Number(balance) });
        }
        setName('');
        setBalance('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Tambah Akun Keuangan"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>Batal</Button>
                    <Button onClick={handleSubmit}>Simpan Akun</Button>
                </>
            }
        >
            <form style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Input label="Nama Akun / Bank" placeholder="misal: BCA Operasional" value={name} onChange={(e) => setName(e.target.value)} />
                <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155', display: 'block', marginBottom: '4px' }}>Tipe Akun</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    >
                        <option value="Kas Tunai">Kas Tunai</option>
                        <option value="Bank">Bank Transfer</option>
                        <option value="E-Wallet">E-Wallet (QRIS / OVO / GoPay)</option>
                    </select>
                </div>
                <Input label="Saldo Awal (Rp)" type="number" placeholder="1000000" value={balance} onChange={(e) => setBalance(e.target.value)} />
            </form>
        </Modal>
    );
}