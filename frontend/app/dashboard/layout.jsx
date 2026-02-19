"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.replace("/");
  }, [router]);

  const logout = async () => {
    try {
      const base =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";
      await fetch(`${base}/logout`, { method: "GET" });
    } catch (e) {
      // ignore
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const apiDocUrl =
    (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001") + "/";

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand as={Link} href="/dashboard">
            Port Russell
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="dash-navbar" />
          <Navbar.Collapse id="dash-navbar">
            <Nav className="me-auto" activeKey={pathname}>
              <Nav.Link as={Link} href="/dashboard" eventKey="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/dashboard/catways"
                eventKey="/dashboard/catways"
              >
                Catways
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/dashboard/reservations"
                eventKey="/dashboard/reservations"
              >
                Réservations
              </Nav.Link>
              <Nav.Link
                as={Link}
                href="/dashboard/users"
                eventKey="/dashboard/users"
              >
                Utilisateurs
              </Nav.Link>

              <Nav.Link href={apiDocUrl} target="_blank" rel="noreferrer">
                Documentation API
              </Nav.Link>
            </Nav>

            <Button variant="outline-danger" onClick={logout}>
              Déconnexion
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">{children}</Container>
    </>
  );
}
