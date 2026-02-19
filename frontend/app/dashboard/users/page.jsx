"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

import { apiFetch } from "../../../lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/users");
      setUsers(data);
    } catch (err) {
      setError(err.message || "Erreur chargement utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const onDelete = async (email) => {
    const ok = window.confirm(`Supprimer l'utilisateur ${email} ?`);
    if (!ok) return;

    try {
      await apiFetch(`/users/${encodeURIComponent(email)}`, { method: "DELETE" });
      await loadUsers();
    } catch (err) {
      alert(err.message || "Suppression impossible");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Utilisateurs</h1>

        <Button as={Link} href="/dashboard/users/new">
          + Nouvel utilisateur
        </Button>
      </div>

      <Card>
        <Card.Body>
          {loading && (
            <div className="d-flex align-items-center gap-2 text-muted">
              <Spinner size="sm" />
              Chargement...
            </div>
          )}

          {error && <Alert variant="danger" className="mb-0">{error}</Alert>}

          {!loading && !error && users.length === 0 && (
            <div className="text-muted">Aucun utilisateur.</div>
          )}

          {!loading && !error && users.length > 0 && (
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th style={{ width: 220 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td className="d-flex gap-2">
                      <Button
                        as={Link}
                        href={`/dashboard/users/${encodeURIComponent(u.email)}/edit`}
                        variant="outline-primary"
                        size="sm"
                      >
                        Modifier
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDelete(u.email)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
