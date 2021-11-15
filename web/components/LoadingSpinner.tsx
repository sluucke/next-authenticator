import { NextPage } from 'next'
import React from 'react'

interface IProps {
  width: number;
  height: number;
  color?: string;
}

export default function LoadingSpinner(props: IProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${props.width} w-${props.height} border-b-2 border-gray-900`}
      ></div>
    </div>
  )
}
