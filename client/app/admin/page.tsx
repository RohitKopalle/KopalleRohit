"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { toast } from "sonner"
import { Trash2, Pencil, Plus, Save, X, LogOut } from "lucide-react"
import type { Project } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type FormState = {
  title: string
  description: string
  techStack: string
  github: string
  demo: string
  image: string
}

const empty: FormState = {
  title: "",
  description: "",
  techStack: "",
  github: "",
  demo: "",
  image: "",
}

export default function AdminPage() {
  const [pw, setPw] = useState<string>("")
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("admin_pw") : null
    if (stored) {
      setPw(stored)
      setAuthed(true)
    }
  }, [])

  const { data, mutate, isLoading } = useSWR<{ projects: Project[] }>(
    authed ? "/api/projects" : null,
    fetcher,
  )

  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(empty)
  const [creating, setCreating] = useState(false)

  function login(e: React.FormEvent) {
    e.preventDefault()
    if (!pw) return
    localStorage.setItem("admin_pw", pw)
    setAuthed(true)
  }

  function logout() {
    localStorage.removeItem("admin_pw")
    setAuthed(false)
    setPw("")
  }

  async function save() {
    if (!form.title || !form.description) {
      toast.error("Title and description are required")
      return
    }
    const payload = {
      title: form.title,
      description: form.description,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      github: form.github,
      demo: form.demo,
      image: form.image,
    }
    const url = editing ? `/api/projects/${editing}` : "/api/projects"
    const method = editing ? "PUT" : "POST"
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": pw,
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      toast.error(j.error || "Failed to save")
      if (res.status === 401) logout()
      return
    }
    toast.success(editing ? "Project updated" : "Project created")
    setForm(empty)
    setEditing(null)
    setCreating(false)
    mutate()
  }

  async function remove(id?: string) {
    if (!id) return
    if (!confirm("Delete this project?")) return
    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": pw },
    })
    if (!res.ok) {
      toast.error("Failed to delete")
      if (res.status === 401) logout()
      return
    }
    toast.success("Project deleted")
    mutate()
  }

  function startEdit(p: Project) {
    setEditing(p._id || null)
    setCreating(false)
    setForm({
      title: p.title,
      description: p.description,
      techStack: p.techStack?.join(", ") || "",
      github: p.github || "",
      demo: p.demo || "",
      image: p.image || "",
    })
  }

  function startCreate() {
    setEditing(null)
    setCreating(true)
    setForm(empty)
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-8"
        >
          <h1 className="text-xl font-semibold tracking-tight">Admin Access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the admin password to manage projects.
          </p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="mt-6 w-full rounded-lg border border-border bg-input/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Sign in
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            Set <code className="font-mono">ADMIN_PASSWORD</code> in your env
            vars to enable.
          </p>
        </form>
      </div>
    )
  }

  const projects = data?.projects || []
  const showForm = creating || editing !== null

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Project Manager
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Add, edit, or remove projects shown on the portfolio.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={startCreate}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="size-4" />
              New
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm hover:bg-secondary transition-colors"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">
                {editing ? "Edit project" : "New project"}
              </h2>
              <button
                onClick={() => {
                  setEditing(null)
                  setCreating(false)
                  setForm(empty)
                }}
                className="inline-flex size-8 items-center justify-center rounded-full hover:bg-secondary"
                aria-label="Cancel"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Title">
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="input"
                />
              </Field>
              <Field label="Tech stack (comma separated)">
                <input
                  value={form.techStack}
                  onChange={(e) =>
                    setForm({ ...form, techStack: e.target.value })
                  }
                  className="input"
                />
              </Field>
              <Field label="GitHub URL">
                <input
                  value={form.github}
                  onChange={(e) =>
                    setForm({ ...form, github: e.target.value })
                  }
                  className="input"
                />
              </Field>
              <Field label="Live demo URL">
                <input
                  value={form.demo}
                  onChange={(e) => setForm({ ...form, demo: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Image URL (optional)" className="sm:col-span-2">
                <input
                  value={form.image}
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.value })
                  }
                  className="input"
                />
              </Field>
              <Field label="Description" className="sm:col-span-2">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={4}
                  className="input resize-none"
                />
              </Field>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={save}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Save className="size-4" />
                {editing ? "Save changes" : "Create project"}
              </button>
            </div>
            <style jsx>{`
              .input {
                width: 100%;
                border-radius: 0.5rem;
                border: 1px solid var(--border);
                background: oklch(0.22 0.008 260 / 0.6);
                padding: 0.6rem 0.8rem;
                font-size: 0.875rem;
                outline: none;
                color: var(--foreground);
              }
              .input:focus {
                border-color: var(--primary);
              }
            `}</style>
          </div>
        )}

        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No projects yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {projects.map((p) => (
              <div
                key={p._id || p.title}
                className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.techStack?.slice(0, 8).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  {p._id ? (
                    <>
                      <button
                        onClick={() => startEdit(p)}
                        className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-secondary/60 hover:bg-secondary transition-colors"
                        aria-label="Edit"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        onClick={() => remove(p._id)}
                        className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-secondary/60 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground self-center">
                      seed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
