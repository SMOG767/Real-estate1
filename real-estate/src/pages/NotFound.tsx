import { Button } from '../components/ui'

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">This page has moved on.</h1>
      <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-muted">
        The address may be wrong, or the page has been retired. The portfolio is the best place to start.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button to="/properties">Browse properties</Button>
        <Button to="/" variant="outline">
          Back home
        </Button>
      </div>
    </div>
  )
}
