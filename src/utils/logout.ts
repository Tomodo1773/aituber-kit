export const logout = () => {
  console.log('Logging out...')
  // セッションをクリア
  sessionStorage.clear()
  // ログインページにリダイレクト
  window.location.href = '/login'
}
