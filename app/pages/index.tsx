export default function Home() {
  const url = "https://www.burnspl.com/mint/kin";
  return (
    <div>
      Redirecting to {url}...
      <meta httpEquiv="refresh" content={`0; url=${url}`} />
    </div>
  )
}
