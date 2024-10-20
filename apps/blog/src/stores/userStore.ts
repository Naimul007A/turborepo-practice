import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { User } from "prisma-types"

export const useUserStore = defineStore("userStore", () => {
  const users: Ref<User[]> = ref([])
  const user: Ref<User> = ref({} as User)
  const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    users.value = await response.json()
  }
  const fetchUser = async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    user.value = await response.json()
  }
  return { users, fetchUsers, user, fetchUser }
})
