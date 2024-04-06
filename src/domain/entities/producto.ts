export interface Product {
    fecha_hora_primer_envio_string: string
    reclamos: string[]
    adt_user_modificacion: string
    ultimo_reclamo: string
    ultimo_movimiento_fecha_envio_integer: number
    resumen: Resumen[]
    ultimo_movimiento_fecha_lectura_string: string
    ultimo_movimiento_nro_cargo_generado: string
    firma_metadata: FirmaMetadata
    ultimo_movimiento_fecha_queja_integer: number
    ultimo_movimiento_fecha_recepcion_integer: number
    ultimo_movimiento_usuario: string
    ultimo_movimiento_fecha_lectura_integer: number
    weaver_version: string
    fecha_corte_integer: number
    ultimo_movimiento_fecha_evento: number
    fecha_primer_envio_integer: number
    tipo_subproducto: string
    ultimo_movimiento_error_envio: string
    adt_fec_modificacion: string
    fecha_corte_string: string
    tipo_subproducto_string: string
    adt_fec_creacion: string
    adt_user_creacion: string
    llave: string
    ultimo_movimiento_periodo: number
    tipo_producto: string
    ultimo_movimiento_fecha_rebote_integer: number
    recursos: Recurso[]
    metadata: Metadata
    periodo: number
    visualizaciones: string[]
    ultimo_movimiento_id: string
    audit_fecha_modificacion: string
    error_generacion: string
    custom03: string
    custom02: string
    ultimo_movimiento_fecha_recepcion_string: string
    ultimo_movimiento_fecha_envio_string: string
    custom01: string
    fecha_hora_primer_envio_integer: number
    fecha_generacion_string: string
    id: string
    ultimo_movimiento_motivo_estado: string
    fecha_generacion_integer: number
    fecha_primer_envio_string: string
    ultimo_movimiento_fecha_queja_string: string
    email_metadata: EmailMetadata
    ultimo_movimiento_fecha_rebote_string: string
    cliente_id: string
    cantidad_reenvios: number
    ip: Ip
    ultimo_movimiento_estado: string
    ultimo_movimiento_ses_message_id: string
    ultimo_movimiento_fecha_hora_envio_string: string
    ultimo_movimiento_estado_string: string
    ultimo_movimiento_motivo_estado_string: string
    ultimo_movimiento_destinatario: string[]
    tipo_producto_string: string
    anio: number
    mes: number
    dia: number
  }
  
  export interface Resumen {
    ult: Ult
    ejecuciones: Ejecucione[]
    id: string
  }
  
  export interface Ult {
    envio_de_correo: string
  }
  
  export interface Ejecucione {
    producto_periodo: number
    movimiento_periodo: number
    fecha: number
    estado: string
    name: string
    producto_id: string
    resources: string[]
    id: string
    movimiento_id: string
    type: string
  }
  
  export interface FirmaMetadata {}
  
  export interface Recurso {
    transforms: string[]
    ubicacion: string
    mimeType: string
    nombre: string
    peso: string
  }
  
  export interface Metadata {
    reporte_cod_account_officer: string
    cuota: any
    ec_sin_password_filename_adjunto: string
    plazo: any
    fechaPago_integer: number
    fechaSaldo: any
    reporte_des_producto: string
    spoolOrigen: string
    ec_con_password_filename_adjunto: string
    origen_spool_digital: boolean
    reporte_enviadoa: string
    montoEfectivoDisponible: string
    totalPaginasEC: number
    reporte_account_officer: string
    mes: string
    origen_spool_tipoEnvio: string
    reporte_nro_cuenta: string
    fechaUltimoClickECI: any
    emailCliente: string[]
    origen_spool_fisico: boolean
    fechaVigencia: any
    origen_spool_tipoTarjeta: string
    numeroContrato: string
    tipoTarjeta: string
    primerNombre: string
    numeroDNICliente: string
    reporte_oficina: string
    razonSocialCliente: string
    correlativo: string
    saldo: string
    fechaPago: string
    pagoMinimo: string
    url: string
    tarjetaCreditoCliente: string
    montoAPagar: string
    origen_spool_tipoEfectivo: string
    marca_procesamiento_recepcion: string
    tcea: any
    tipoEnvio: string
    hash: string
  }
  
  export interface EmailMetadata {
    body: any
    html: Html
  }
  
  export interface Html {
    fechaVigencia: any
    cuota: any
    primerNombre: string
    plazo: any
    fechaSaldo: any
    url: string
    fechaPago: string
    pagoMinimo: string
    montoEfectivoDisponible: string
    montoAPagar: string
    mes: string
    tcea: any
    hash: string
  }
  
  export interface Ip {
    transaction_id: string
    periodo: number
    engine: Engine
    id: string
    tag: string
    dlq_execution_id: string
    business_id: string
  }
  
  export interface Engine {
    processId: string
    groupId: string
  }
  