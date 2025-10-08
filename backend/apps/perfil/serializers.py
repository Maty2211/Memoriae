from rest_framework import serializers

# Serializer para los datos del heatmap
class HeatmapDataSerializer(serializers.Serializer):
    fecha = serializers.DateField()
    minutos_totales = serializers.IntegerField()

# Serializer para las estadísticas semanales anidadas
class EstadisticasSemanalesSerializer(serializers.Serializer):
    minutos_semana_actual = serializers.IntegerField()
    minutos_semana_anterior = serializers.IntegerField()
    cambio_porcentual = serializers.FloatField()

# Serializer para el resumen mensual anidado
class ResumenMensualSerializer(serializers.Serializer):
    mes = serializers.CharField(max_length=10)
    minutos_totales = serializers.IntegerField()

# --- Serializer Principal ---
class EstadisticasPerfilSerializer(serializers.Serializer):
    datos_heatmap = HeatmapDataSerializer(many=True)
    racha_de_dias = serializers.IntegerField()
    estado_meta_diaria = serializers.DictField(
        child=serializers.BooleanField()
    )
    estadisticas_semanales = EstadisticasSemanalesSerializer()
    resumen_mensual = ResumenMensualSerializer(many=True)
