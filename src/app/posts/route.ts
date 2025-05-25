import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const requestHeaders = req.headers
  const acceptLanguage = requestHeaders.get('accept-language')
  const firstLanguage = acceptLanguage?.split(',')[0]
  const redirectURL = new URL(req.url)
  if (
    firstLanguage === 'zh-CN' ||
    firstLanguage === 'zh-TW' ||
    firstLanguage === 'zh-HK' ||
    firstLanguage === 'zh-SG' ||
    firstLanguage === 'zh-MO' ||
    firstLanguage === 'zh'
  ) {
    redirectURL.pathname = '/posts/topics'
  } else {
    redirectURL.pathname = '/posts/topics'
  }
  return NextResponse.redirect(`${redirectURL}`)
}
