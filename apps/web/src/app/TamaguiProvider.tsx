'use client'

import { useServerInsertedHTML } from 'next/navigation'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TamaguiProvider as TamaguiProviderOG, createTamagui } from 'tamagui'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { config } from '@my/config'

export function TamaguiProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet()
    return (
      <style
        dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }}
        id={rnwStyle.id}
      />
    )
  })

  return (
    <NextThemeProvider onChangeTheme={setTheme as any} defaultTheme={theme}>
      <TamaguiProviderOG config={config} defaultTheme={theme}>
        {children}
      </TamaguiProviderOG>
    </NextThemeProvider>
  )
}