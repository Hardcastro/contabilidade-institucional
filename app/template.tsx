/**
 * Template, not layout — Next.js remounts this on every navigation (layout
 * survives across routes, template doesn't), which is what restarts
 * .page-transition's animation on each page change without any router
 * event listener. See the keyframes in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
