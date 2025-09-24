import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, type FormSchema } from './model'
import { useLogin } from './hooks'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { useStore } from '@/app/store'
import { Button } from '@/shared/components/ui/button'
import { Loader } from 'lucide-react'

export const LoginForm = () => {
  const { loginIsMutating, triggerLogin } = useLogin()

  const login = useStore(state => state.survivor.login)
  const password = useStore(state => state.survivor.password)
  const setUserLogin = useStore(state => state.survivor.setLogin)
  const setUserPassword = useStore(state => state.survivor.setPassword)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login,
      password,
    },
    disabled: loginIsMutating,
  })

  const onSubmit: SubmitHandler<FormSchema> = data => triggerLogin(data)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='login'
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Введите логин'
                  onChange={event => {
                    onChange(event)
                    setUserLogin(event.target.value)
                    return true
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>Это ваш уникальный логин</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Введите пароль'
                  onChange={event => {
                    onChange(event)
                    setUserPassword(event.target.value)
                    return true
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>Это ваш уникальный пароль</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={loginIsMutating}>
          Отправить {loginIsMutating && <Loader />}
        </Button>
      </form>
    </Form>
  )
}
