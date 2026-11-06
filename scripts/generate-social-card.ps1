# Optional Windows-only design helper. Not needed for install or production builds.
Add-Type -AssemblyName System.Drawing
$cardRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Join-Path (Get-Location) 'scripts' }
$bitmap = New-Object System.Drawing.Bitmap(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#0a101b'))
$accent = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#76e4d3'))
$white = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#f0f3f7'))
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#a9b4c6'))
$pen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#263849'))
$small = New-Object System.Drawing.Font('Consolas', 18)
$large = New-Object System.Drawing.Font('Segoe UI', 65, [System.Drawing.FontStyle]::Bold)
$medium = New-Object System.Drawing.Font('Segoe UI', 25)
try {
  $graphics.DrawLine($pen, 80, 165, 1120, 165)
  $graphics.DrawLine($pen, 80, 455, 1120, 455)
  $graphics.DrawString('SOFTWARE ENGINEERING / BRAZIL', $small, $accent, 80, 100)
  # Code points keep this script compatible with Windows PowerShell 5.1 encoding.
  $name = 'C' + [char]0x00E1 + 'lamo Andret'
  $graphics.DrawString($name, $large, $white, 72, 215)
  $graphics.DrawString('Python Backend & AI Integration', $medium, $muted, 80, 345)
  $graphics.DrawString('github.com/CalamoAndret', $small, $accent, 80, 505)
  $bitmap.Save((Join-Path $cardRoot '..\public\social-card.png'), [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
  $small.Dispose(); $large.Dispose(); $medium.Dispose()
  $pen.Dispose(); $accent.Dispose(); $white.Dispose(); $muted.Dispose()
  $graphics.Dispose(); $bitmap.Dispose()
}
