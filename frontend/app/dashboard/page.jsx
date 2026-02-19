"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { apiFetch } from "../../lib/api";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentReservations, setCurrentReservations] = useState([]);

  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(
    () =>
      new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(today),
    [today]
  );

  useEffect(() => {
    // user stocké au login
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }

    const fetchReservations = async () => {
      setLoading(true);
      setError("");

      try {
        // On récupère toutes les réservations catway par catway.
        // Comme l'API n'a pas de route GET /reservations globale dans le brief,
        // on liste d'abord les catways puis on fetch les réservations pour chacun.
        const catways = await apiFetch("/catways");

        const all = [];
        for (const c of catways) {
          const list = await apiFetch(`/catways/${c.catwayNumber}/reservations`);
          for (const r of list) all.push(r);
        }

        const now = new Date();
        const current = all.filter((r) => new Date(r.endDate) >= now);

        // tri par date de début
        current.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        setCurrentReservations(current);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des réservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <>
      <h1 className="h3 mb-3">Tableau de bord</h1>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h5 mb-3">Utilisateur connecté</Card.Title>

              {user ? (
                <>
                  <div>
                    <strong>Nom :</strong> {user.username}
                  </div>
                  <div>
                    <strong>Email :</strong> {user.email}
                  </div>
                </>
              ) : (
                <div className="text-muted">
                  Infos utilisateur indisponibles (reconnecte-toi).
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h5 mb-3">Date du jour</Card.Title>
              <div>{todayStr}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Card.Title className="h5 mb-3">Réservations en cours</Card.Title>

          {loading && (
            <div className="d-flex align-items-center gap-2 text-muted">
              <Spinner size="sm" />
              Chargement...
            </div>
          )}

          {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}

          {!loading && !error && currentReservations.length === 0 && (
            <div className="text-muted">Aucune réservation en cours.</div>
          )}

          {!loading && !error && currentReservations.length > 0 && (
            <Table striped bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>Catway</th>
                  <th>Client</th>
                  <th>Bateau</th>
                  <th>Début</th>
                  <th>Fin</th>
                </tr>
              </thead>
              <tbody>
                {currentReservations.map((r) => (
                  <tr key={r._id}>
                    <td>{r.catwayNumber}</td>
                    <td>{r.clientName}</td>
                    <td>{r.boatName}</td>
                    <td>
                      {new Date(r.startDate).toLocaleDateString("fr-FR")}
                    </td>
                    <td>{new Date(r.endDate).toLocaleDateString("fr-FR")}</td>
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
