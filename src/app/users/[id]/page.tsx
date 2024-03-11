export default function User({ params }: { params: { id: number } }) {
  return <main> este es el User page. user {params.id}</main>
}
