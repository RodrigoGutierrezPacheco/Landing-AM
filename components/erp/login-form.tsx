'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { Plane, Lock, Mail } from 'lucide-react'

export function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const success = await login(email, password)
    
    if (!success) {
      setError('Credenciales incorrectas')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md relative z-10 border-sidebar-border bg-sidebar/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Plane className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-sidebar-foreground">
            AM Pachuca ERP
          </CardTitle>
          <CardDescription className="text-sidebar-foreground/70">
            Sistema de Gestion de Agencia de Viajes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel className="text-sidebar-foreground">Correo electronico</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-sidebar-border/30 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                    required
                  />
                </div>
              </Field>
              
              <Field>
                <FieldLabel className="text-sidebar-foreground">Contrasena</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-sidebar-border/30 border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                    required
                  />
                </div>
              </Field>

              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Iniciando sesion...
                  </>
                ) : (
                  'Iniciar Sesion'
                )}
              </Button>
            </FieldGroup>
          </form>
          
          <div className="mt-6 p-4 rounded-lg bg-sidebar-border/20 border border-sidebar-border/50">
            <p className="text-xs text-sidebar-foreground/60 text-center mb-2">
              Credenciales de prueba:
            </p>
            <p className="text-xs text-sidebar-foreground/80 text-center font-mono">
              prueba@prueba.com / prueba
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
