let mayan = undefined
let loading = undefined

export default async function loadMayan() {
  if (mayan) return mayan
  if (loading) return loading

  const script = document.createElement('script')
  script.src = "https://cdn.mayan.finance/widget_ultimate-0-4-5.js"
  script.crossorigin = "anonymous"
  // this only works in secure context
  if (window.location.protocol === "https:") {
    script.integrity = 'sha256-Dem40VAlLsczlbgJyd9U20HCZiihA1UFQy96wdDqVYQ='
  }
  document.body.appendChild(script)

  loading = new Promise((resolve, reject) => {
    script.onload = function() {
      mayan = window.MayanSwap
      resolve(mayan)
      loading = undefined
    }
    script.onerror = () => {
      reject()
      loading = undefined
    }
  })
  return loading
}
