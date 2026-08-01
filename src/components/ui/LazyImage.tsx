import { memo, type ImgHTMLAttributes } from 'react'

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  eager?: boolean
}

function LazyImageComponent({ eager = false, className, alt = '', ...props }: LazyImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}

export const LazyImage = memo(LazyImageComponent)
