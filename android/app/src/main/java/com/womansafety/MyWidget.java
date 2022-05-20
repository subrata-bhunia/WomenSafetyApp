package com.womansafety;



import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.RemoteViews;

/**
 * Implementation of App Widget functionality.
 */
public class MyWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            Intent intent = new Intent(context, CustomReactActivity.class);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);  // Identifies the particular widget...
            intent.putExtra("module", "WomenSafety");

            Bundle b = new Bundle();
            b.putString("navigationKey","MedicationScreen");

            Bundle med = new Bundle();
            med.putString("medId", "P0001");
            med.putString("medName", "Panadol");

            b.putBundle("medication",med);

            intent.putExtra("data",b);

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            
            // Make the pending intent unique...
            PendingIntent pendIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.medication_widget);
            views.setOnClickPendingIntent(R.id.appwidget_text, pendIntent);
            appWidgetManager.updateAppWidget(appWidgetId,views);
        }

    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}