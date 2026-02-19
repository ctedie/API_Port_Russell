"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

import { apiFetch } from "../../../lib/api";

export default function CatwaysPage() {
  const [catways, setCatways] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCatways = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiFetch("/catways");
      setCatways(data);
    } catch (err) {
      setError(err.message || "Erreur chargement catways");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatways();
  }, []);

  const onDelete = async (id) => {
    const ok = window.confirm(`Supprimer le catway ${id} ?`);
    if (!ok) return;

    try {
      await apiFetch(`/catways/${id}`, { method: "DELETE" });
      await loadCatways();
    } catch (err) {
      alert(err.message || "Suppression impossible");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Catways</h1>

        <Button as={Link} href="/dashboard/catways/new">
          + Nouveau catway
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

          {!loading && !error && catways.length === 0 && (
            <div className="text-muted">Aucun catway.</div>
          )}

          {!loading && !error && catways.length > 0 && (
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Type</th>
                  <th>État</th>
                  <th style={{ width: 220 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {catways.map((c) => (
                  <tr key={c.catwayNumber}>
                    <td>{c.catwayNumber}</td>
                    <td>{c.catwayType}</td>
                    <td>{c.catwayState}</td>
                    <td className="d-flex gap-2">
                      <Button
                        as={Link}
                        href={`/dashboard/catways/${c.catwayNumber}/edit`}
                        variant="outline-primary"
                        size="sm"
                      >
                        Modifier
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onDelete(c.catwayNumber)}
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
