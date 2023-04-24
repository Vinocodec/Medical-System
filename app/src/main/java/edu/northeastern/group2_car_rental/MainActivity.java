package edu.northeastern.group2_car_rental;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import edu.northeastern.group2_car_rental.Project.ProjectActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onProjectActivity(View view) {
        openNewActivity(ProjectActivity.class);
    }

    private void openNewActivity(Class targetActivityClass) {
        Intent intent = new Intent (MainActivity.this, targetActivityClass);
        startActivity(intent);
    }
}